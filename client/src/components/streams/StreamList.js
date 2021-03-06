import React from "react";
import { connect } from 'react-redux';
import { fetchStreams } from "../../actions";
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">    
                    <Link 
                        className="ui button primary" 
                        to={`/streams/edit/${stream.id}`}
                    >
                        Edit
                    </Link> 
                    <Link
                        className="ui button negative"
                        to={`streams/delete/${stream.id}`}
                    >
                        Delete
                    </Link>
                </div>
            )
        };
    }
    
    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`}>
                            {stream.title}
                        </Link>
                    </div>
                    <div className="description">
                        {stream.description}
                    </div>   
                </div>
            );
        });
    }
    
    renderCreateStreamButton() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link 
                        className="ui button primary"
                        to="/streams/new"
                    >
                        Create stream
                    </Link>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div>
                <h2>Your streams</h2>
                <div className="ui celled list">
                    {this.renderList()}    
                </div>
                {this.renderCreateStreamButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(
        mapStateToProps, 
        { fetchStreams }
    )(StreamList);