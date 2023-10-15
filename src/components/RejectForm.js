import React, { Component } from 'react'

export default class RejectForm extends Component {
  constructor(props){
    super(props)
    this.state = {
        
    }
  }
  componentDidMount(){
    console.log(this.props.data)
  }
  render() {
    return (
      <div>{this.props}</div>
    )
  }
}
