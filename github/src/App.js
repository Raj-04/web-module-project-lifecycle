import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    userData : {},
    followers: [],
    searchUser: '',
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      searchUser: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.searchUser}`)
      .then(res => {
        this.setState({
          ...this.state,
          userData: res.data
        })
      })

    axios.get(`https://api.github.com/users/${this.state.searchUser}/followers`)
      .then(res => {
        console.log(res.data)
        this.setState({
          ...this.state,
          followers: res.data
        })
      .catch(err => {
        console.error(err)
      })
      })
  }

  render() {
    let data = this.state.userData
    let users = this.state.followers

    return(<div className="App">
      <h1 className="title">Github User Card</h1>
      <form>
        <input onChange={this.handleChange} />
        <button onClick={this.handleClick}>Search User</button>
      </form>
        <div className="Card">
          <div><h1>Username:</h1>{data.login}<img src={data.avatar_url}/></div>
          <div><h2>Name:</h2>{data.name}</div>
          <div><h2>Bio:</h2>{data.bio}</div>
          <div><h2>Location:</h2>{data.location}</div>
          <div><h2>Followers:</h2>{data.followers}</div>
          <div><h2>Following:</h2>{data.following}</div>
          <div><h2>Gists:</h2>{data.public_gists}</div>
          <div><h2>Repos:</h2>{data.public_repos}</div>
        </div>
        <div className="Followers">
          {users.map(item => {
            return(<div>
              <div><h2>Followers avatar</h2><img className="img" src={item.avatar_url}/></div>
              <div><h2>Followers Login</h2>{item.login}</div>
              <div><h2>Followers</h2>{item.followers}</div>
              <div><h2>Followers type</h2>{item.type}</div>
              </div>)
          })}
        </div>
    </div>)
  }

}

export default App;

