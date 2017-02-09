import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getApi, GitUsersUrl, GitUserUrl} from './commons'
import { Link } from 'react-router'
export class Home extends Component {
  constructor(props){
  	super(props);
    this._onChange = this._onChange.bind(this)
    this.getData = this.getData.bind(this)
    this.displayUsers = this.displayUsers.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.NextPage = this.NextPage.bind(this)
  	this.state = {
      q : "",
      page: 1,
      items : [],
      total_count : 0
    };
  }
  _onChange(e){
    this.setState({q :e.target.value})
  }
  getData(query={ q : this.state.q, page : this.state.page, per_page: 10 }){
    console.log(query)
    getApi(GitUsersUrl,query,(result) => {
      if(result){
        this.setState({items:result.items, total_count: result.total_count, page: query.page})
      }
    })
  }
  previousPage(){
      this.getData({ q : this.state.q, page : this.state.page - 1, per_page: 10 })
  }
  NextPage(){
    this.getData({ q : this.state.q, page : this.state.page + 1, per_page: 10 })
  }
  displayUsers(){
    return this.state.items.map( elem => {
      return (
        <tr key={elem.id}>
          <td>
          <Link to={"/user/" + elem.id}>
            {elem.login}
          </Link>
          </td>
          <td>
          <img src={elem.avatar_url} role="presentation" width="150px" height="150px"/>
          </td>
        </tr>
      )
    })
  }
  render() {
    if(this.props.children){
      return this.props.children
    }
    return (
      <div>
          Search Git User
          <input value={this.state.q} onChange={this._onChange}/>
          <button onClick={e => this.getData()}>Search</button>
        <table>
          <thead>
            <th>Name</th>
            <th>Image</th>
          </thead>
          <tbody>
          {this.displayUsers()}
          </tbody>
        </table>

      {this.state.page > 1 ? <button onClick={this.previousPage}>Previous Page</button> : null }
      {this.state.page * 10 < this.state.total_count ?
        <button onClick={this.NextPage}>Next Page</button>
      : null }
      </div>
    );
  }
}
export class User extends Component {
  constructor(props){
  	super(props);
    this.displayUser = this.displayUser.bind(this)
    this.getData = this.getData.bind(this)
  	this.state = {

    };
  }
  getData(){
    getApi(GitUserUrl+this.props.routeParams.user,{},result => {
      this.setState(result)
    })
  }
  componentWillMount() {
    this.getData()
  }
  displayUser(){
    let content = []
    for (var elem in this.state){
        console.log(elem)
        if(elem == "login"){
          content.push(
            <Link to={this.state.html_user}>{this.state.name}</Link>
          )
        }
    }
    return (<div>{content}</div>)
  }
    render() {
        return (
            <div className="class-name">
              {this.state.login ?
                <Link to={this.state.html_user}>{this.state.name}</Link>
              : null }
              {this.state.avatar_url ?
              <img src={this.state.avatar_url} role="presentation" width="150px" height="150px"/> : null }
              {
                this.state.bio ?
                <p>{this.state.bio}</p> : null
              }
              {
                this.state.blog ?
                <a href={this.state.blog}>Blog</a> : null
              }
              {
                this.state.public_repos ?
                <p> Public Repos : {this.state.public_repos} </p>: null
              }
              {
                this.state.public_gists ?
                <p> Public Gists : {this.state.public_gists} </p>: null
              }
              {
                this.state.followers ?
                <p> Followers : {this.state.followers} </p>: null
              }
              {
                this.state.following ?
                <p> Following : {this.state.following} </p>: null
              }
            </div>
        );
    }
}
