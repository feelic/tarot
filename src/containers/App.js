import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
// redux
import {connect} from 'react-redux';
import * as appActions from '../actions';
// components
import Deck from '../components/Deck';
import './App.css';

export class App extends Component {
  /**
   * Render application
   *
   * @return {JSX} component markup
   */
  render () {
    const {players, status} = this.props;

    return (
      <div className="">
        {Object.values(players).map(player => {
          //return <Deck key={player.name} cards={player.hand} />;
        })}
        {//<Deck cards={status.chien} />
        }
        <div className="top-panel"><Deck cards={players.Albertine.hand} turned={true} /></div>
        <div className="left-panel"><Deck cards={players.Boris.hand} turned={true} /></div>
        <div className="center-panel"><Deck cards={status.chien} turned={true} /></div>
        <div className="right-panel"><Deck cards={players.Carlotta.hand} turned={true} /></div>
        <div className="bottom-panel"><Deck cards={players.You.hand} /></div>
      </div>
    );
  }
}

/**
 * Map all our state to the application
 *
 * @param  {Object} state state of our application
 * @return {Object} props
 */
function mapStateToProps (state) {
  return {
    ...state
  };
}

/**
 * Map all our actions to dispatch
 *
 * @param  {Object} dispatch store dispatch function
 * @return {Object} actions
 */
function mapDispatchToProps (dispatch) {
  return {
    'actions': bindActionCreators(appActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
