import React, { Component } from 'react';
import { createStore, createStyleSet } from 'botframework-webchat';

import WebChat from './WebChat';

import './fabric-icons-inline.css';
import './MinimizableWebChat.css';

export default class extends Component {
  constructor(props) {
    super(props);
  
    const store = createStore({}, ({ dispatch }) => next => action => {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        setTimeout(() => {
          dispatch({
            type: 'DIRECT_LINE/POST_ACTIVITY',
            payload: {
              activity: {
                name: 'webchat/join',
                type: 'event',
                value: {
                  language: window.navigator.language
                }
              }
            }
          });
        }, 1000);
      } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        if (action.payload.activity.from.role === 'bot') {
          this.setState(() => ({ newMessage: true }));
        }
      }

      return next(action);
    });

    this.state = {
      store,
      styleSet: createStyleSet({
        backgroundColor: 'white'
      }),
      token: null
    };
  }

  handleFetchToken = async () => {
    if (!this.state.token) {
      const res = await fetch('https://anna.govlawtech.com.au/api/directlineToken', { method: 'POST' });
      const { token } = await res.json();
      this.setState(() => ({ token }));
    }
  }

  render() {
    const { state: {
      store,
      styleSet,
      token
    } } = this;

    return (
      <div className="minimizable-web-chat">
        {
          <div className={ 'chat-box' }>
            <div className= {'chat-box-header'}>
              <div className="chat-box-header-text">
                Ask "ANNA": Army, Navy 'n' Airforce
              </div>
            </div>
              
            <WebChat
              className="react-web-chat"
              onFetchToken={ this.handleFetchToken }
              store={ store }
              styleSet={ styleSet }
              token={ token } />
          </div>
        }
      </div>
    );
  }
}
