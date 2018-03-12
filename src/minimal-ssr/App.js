/*
 * Copyright (c)  2018 Wise Wild Web .
 *
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 * @author : Nathanael Braun
 * @contact : caipilabs@gmail.com
 */

import React from "react";

import "react-rescope";
import "rescope-spells";
import Rescope, {Scope, reScope, scopeToProps, scopeToState, spells} from "rescope";

let { asStateMap, asScope } = spells;
let ReactDom                = require('react-dom');


@scopeToState(["appState", "someData"])
class App extends React.Component {
    @asScope
    static AppScope  = {
        @asStateMap
        appState: {
            selectedItemId: null
        },
        @asStateMap
        someData: {
            src  : "/api/hello",
            items: [{ text: 'test' }]
        }
    };
    static renderTo  = ( node ) => {
        let cScope = new App.AppScope();
        cScope.mount(
            ["appState", "someData"]
        ).then(
            ( err, state, context ) => {
                ReactDom.render(<App __scope={ cScope }/>, node);
            }
        )
    }
    static renderSSR = ( req ) => {
        //let cScope = new App.AppScope();
        //MyScope.mount(
        //    ["appState", "someData"]
        //).then(
        //    ( err, state, context ) => {
        //        ReactDom.render(<App __scope={ cScope }/>, node);
        //    }
        //)
    }
    
    render() {
        let {
                someData, appState
            } = this.state;
        return (
            <div>
                <h1>Really basic drafty rescope SSR example</h1>
                {
                    someData.items.map(
                        note => <PostIt record={ note } selected={ note._id == appState.selectedItemId }/>
                    )
                }
            
            </div>
        );
    }
}

@reScope(
    {
        @asStateMap
        props: {},
        
        @asStateMap
        record: "props.record"
    }
)
@scopeToProps(
    {
        style: "record.style",
        text : "record.text"
    })
class PostIt extends React.Component {
    
    render() {
        let {
                style, text
            } = this.props;
        return (
            <div style={ style }>
                {
                    text
                }
            </div>
        );
    }
}

window.App = App;
export default App