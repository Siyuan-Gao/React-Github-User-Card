import React from "react";
import "./App.css";
import userCard from "./components/usercard";
import followers from "./components/followers";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      githubUser: [],
      follower: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/siyuan-gao")
      .then((res) => {
        console.log(res.data);
        this.setState({
          image: res.data.avatar_url,
          name: res.data.name,
          login: res.data.login,
          followers: res.data.followers,
          location: res.data.location,
        });
        console.log(this.state);
      })
      .catch((err) => {
        console.error("Error", err);
      });

    axios
      .get("https://api.github.com/users/siyuan-gao/followers")
      .then((res) => (follower) => {
        console.log(follower.data);
        this.setState({ followers: follower.data, githubUser: follower.data });
      })
      .catch((err) => {
        console.error("Error!", err);
      });
  }

  render() {
    return (
      <div className="App">
        <userCard
          url={this.state.image}
          name={this.state.name}
          login={this.state.login}
          followers={this.state.followers}
          location={this.state.location}
        />

        {this.state.followers.map((e) => {
          return (
            <followers
              image={e.avatar_url}
              name={e.login}
              followers_url={e.followers_url}
              organizations_url={e.organizations_url}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
