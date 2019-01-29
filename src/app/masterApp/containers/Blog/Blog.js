import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'
// import axios from '../../../../axios.js';

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'
import RenderRoutes from '../../routes/routes';

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
                <RenderRoutes/>
                {false && <Route path="/" exact render={() => <h1>Home</h1>} />}
                { false && <Route path="/" exact component={Posts} /> }
                {false && <Route path="/new-post" exact component={NewPost} />}
                {false && <Route path="/:id" exact component={FullPost} />}
                
            </div>
        );
    }
}

export default Blog;