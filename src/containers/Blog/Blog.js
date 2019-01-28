import React, { Component } from 'react';
import axios from '../../axios';
import {Route, Link} from 'react-router-dom'

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    render () {
        console.log('Blog===>',this.props);
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/new-post">New Post</Link></li>
                        <li><Link to={{
                            pathname: '/new-post',
                            hash: '#submit',
                            search: '?quick-submit=true'
                        }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                {false && <Route path="/" exact render={() => <h1>Home</h1>} />}
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" exact component={NewPost} />
                <Route path="/:id" exact component={FullPost} />
            </div>
        );
    }
}

export default Blog;