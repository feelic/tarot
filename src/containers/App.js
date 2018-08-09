import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
// redux
import {connect} from 'react-redux';
import * as appActions from '../actions';
// components
import Deck from '../components/Deck';

export class App extends Component {
  /**
   * Render application
   *
   * @return {JSX} component markup
   */
  render () {
    const {players, chien} = this.props;

    console.log(players)
    return (
      <div className="">
        {players.map(player => {
          return <Deck cards={player} />
        })}
        <Deck cards={chien} />
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
