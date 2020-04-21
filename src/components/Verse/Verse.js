import React from 'react';
import Votd from './Votd';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Verse.css';
import { withStyles } from '@material-ui/core/styles';

const ID = "id";
const TITLE = "title";
const ABV = "abbreviation";

const VersionButton = withStyles({
  root: {
    width: '10vw',
    color: 'rgba(64, 64, 65,0.8)',
    marginTop: '0.5%',
    '&:hover': {
       backgroundColor: 'rgba(255,255,255,0.7)',
       color: 'rgba(23,23,23,1.0)'
    },
    '& .MuiListItem-button': {
      overflow: 'auto',
    }
  },
})(Button);

export default class Verse extends React.Component {
  constructor(props) {
    super(props);

    let versionMap = new Map();
    let versionMetadata = {
      id: 1,
      abv: "KJV"
    };
    versionMap.set("King James Version", versionMetadata);

    this.state = {
      versionTitle: "King James Version",
      versionMap: versionMap,
      anchorEl: null,
      open: false,
    }

    this.getVersions = this.getVersions.bind(this);
    this.parseVersionData = this.parseVersionData.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getVersions() {
    var map = new Map(JSON.parse(localStorage.getItem("versionMap")));
    if (map.size <= 0) {
      var url = 'https://developers.youversionapi.com/1.0/versions';
      const otherParam = {
        headers: {
          "Accept": "application/json",
          "X-YouVersion-Developer-Token" : process.env.REACT_APP_YOUVERSION_TOKEN
        }
      }
      fetch(url, otherParam)
          .then((response) => response.json())
          .then((response) => {
            this.parseVersionData(response.data);
          })
          .catch((error) => console.error(error));
    }
  }

  parseVersionData(versionData) {
    var versions = new Map(); // { "title": {abbreviation: "", id: ""} }
    for (let i=0;i<versionData.length;++i) {
      let versionMetadata = {
        id: versionData[i][ID],
        abv: versionData[i][ABV]
      };
      versions.set(versionData[i][TITLE], versionMetadata);
    }
    this.setState({ versionMap: versions });
    localStorage.setItem("versionMap", JSON.stringify(Array.from(versions.entries())));
  }

  handleButtonClick(event) {
      this.getVersions();
      this.setState({ anchorEl: event.currentTarget });
      this.setState({ open: true });
  }

  handleMenuClick(event) {
      const title = event.currentTarget.innerText;
      localStorage.setItem("versionId", this.state.versionMap.get(title).id);
      this.setState({ versionTitle: title });
      localStorage.setItem("versionTitle", title);
      this.setState({ anchorEl: null });
      this.setState({ open: false });
  }

  handleClose() {
      this.setState({ open: false });
      this.setState({ anchorEl: null });
  }

  hydrateStateWithLocalStorage() {
    var versionMapKey = "versionMap";
    if (localStorage.hasOwnProperty(versionMapKey)) {
      let value = localStorage.getItem(versionMapKey);
      try {
        value = new Map(JSON.parse(value));
        this.setState({ [versionMapKey]: value });
      } catch(e) {
        console.info("Cached Map is empty, using constructor default");
      }
    }
    var versionTitleKey = "versionTitle";
    if (localStorage.hasOwnProperty(versionTitleKey)) {
      let value = localStorage.getItem(versionTitleKey);
      value = JSON.parse(value);
      try {
        this.setState({ [versionTitleKey]: value });
      } catch(e) {
        this.setState({ [versionTitleKey]: value });
      }
    }
  }

  saveStateToLocalStorage() {
      // for every item in React state
      // save to localStorage
      localStorage.setItem("versionTitle", JSON.stringify(this.state.versionTitle));
      // localStorage.setItem(key, JSON.stringify());
  }

  componentDidMount() {
      if (localStorage.length !== 0) {
        console.log("componentDidMount: using cached data");
        this.hydrateStateWithLocalStorage();
      }
      // add event listener to save state to localStorage
      // when user leaves/refreshes the page
      window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
      );
  }

  render() {

    let versionMap = this.state.versionMap;
    let versionId = JSON.parse(localStorage.getItem("versionId"));
    if (versionId === undefined || versionId === null) {
      versionId = 1;
    }
    let versionName = versionMap.get(this.state.versionTitle);
    if (versionMap.has(this.state.versionTitle)) {
      versionName = versionMap.get(this.state.versionTitle).abv;
    } else {
      versionName = ""
    }

    return (
      <div className="Verse-container">
        <Votd versionId={versionId} />
        <VersionButton size="small" onClick={this.handleButtonClick} className="Version-button">
          Version: {versionName}
        </VersionButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={this.state.open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 20 * 4.5,
            },
          }}
        >
          { Array.from(versionMap.keys()).map((key) => (
            <MenuItem key={key} selected={key === this.state.versionTitle} onClick={this.handleMenuClick}>
            {key}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}
