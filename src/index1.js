import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Toaster from "./toaster";
import { events, intents } from "src/utils/constants";

/* Adding three event listeners for actions */
const successEvent = new Event(events.SUCCESS);
const dangerEvent = new Event(events.DANGER);

console.log("events", events);
class App extends React.Component {
  state = {
    show: false,
    currentIntent: intents.PRIMARY
  };

  componentDidMount() {
    const elem = document.getElementById("root");

    /* Add event listener for events of success and danger 
    and pass respective intents necessary */
    elem.addEventListener(events.SUCCESS, () =>
      this.showToast(intents.SUCCESS)
    );
    elem.addEventListener(events.DANGER, () => this.showToast(intents.DANGER));
  }

  componentWillUnmount() {
    const elem = document.getElementById("root");

    elem.removeEventListener(events.SUCCESS, this.closeToast);
    elem.removeEventListener(events.DANGER, this.closeToast);
  }

  showToast = intent => {
    this.setState({ show: true, currentIntent: intent });
  };

  closeToast = () => {
    this.setState({ show: false });
  };

  handleOnClick = () => {
    const elem = document.getElementById("root");
    elem.dispatchEvent(successEvent);
    // this.setState({ show: !this.state.show });
  };

  render() {
    return (
      <div id="app-toast" className="App">
        <button onClick={this.handleOnClick}>Open</button>
        {this.state.show && (
          <Toaster
            {...this.props}
            intent={this.state.currentIntent}
            closeToast={this.closeToast}
          />
        )}
      </div>
    );
  }
}

export default App;

const elem = document.getElementById("root");

export const toast = {
  success: function() {
    elem.dispatchEvent(successEvent);
  },
  error: function() {
    console.log("error", elem);
    elem.dispatchEvent(dangerEvent);
  }
};

setTimeout(() => {
  toast.error();
}, 2000);
const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
