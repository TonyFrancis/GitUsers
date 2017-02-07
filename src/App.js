import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getApi, GitUserUrl} from './commons'
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
  getData(){
    getApi(GitUserUrl,{ q : this.state.q, page : this.state.page, per_page: 10 }, (result) => {
      if(result){
        this.setState({items:result.items, total_count: result.total_count})
      }
    })
  }
  previousPage(){
      getApi(GitUserUrl,{ q : this.state.q, page : this.state.page - 1, per_page: 10 }, (result) => {
        if(result){
          this.setState({items:result.items, total_count: result.total_count,page : this.state.page + 1 })
        }
      })
  }
  NextPage(){
    getApi(GitUserUrl,{ q : this.state.q, page : this.state.page + 1, per_page: 10 }, (result) => {
      if(result){
        this.setState({items:result.items, total_count: result.total_count, page : this.state.page + 1 })
      }
    })
  }
  displayUsers(){
    return this.state.items.map( elem => {
      return (
        <tr key={elem.id}>
          <td>
            {elem.login}
          </td>
          <td>
          <img src={elem.avatar_url} role="presentation" width="150px" height="150px"/>
          </td>
        </tr>
      )
    })
  }
  render() {
    return (
      <div>
          Search Git User
          <input value={this.state.q} onChange={this._onChange}/>
          <button onClick={this.getData}>Search</button>
        <table>
        {this.displayUsers()}
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

    render() {
        return (
            <div className="class-name">
                Hello
            </div>
        );
    }
}
