import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      url
      description
    }
  }
`

class CreateLink extends Component {
    state = {
        description: '',
        url: '',
    }

    render() {
        const { description, url } = this.state
        return (
            <div>
                <div className="">
                    <input
                        className=""
                        value={description}
                        onChange={e => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className=""
                        value={url}
                        onChange={e => this.setState({ url: e.target.value })}
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
                    {postMutation => <button onClick={postMutation}>Submit</button>}
                </Mutation>
            </div>
        )
    }
}

export default CreateLink

