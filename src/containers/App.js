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
    const {actions, players, status} = this.props;
    const panelClasses = [
      'top-panel',
      'left-panel',
      'right-panel',
      'bottom-panel'
    ];

    return (
      <div className="">
        {Object.values(players).map((player, idx) => {
          return (
            <div className={panelClasses[idx]}>
              <Deck
                actions={actions}
                key={player.name}
                player={player.name}
                isPlayer={player.name === 'You'}
                cards={player.hand}
                turned={player.name !== 'You'}
              />
            </div>
          );
        })}
        <div className="center-panel">
          {status.currentTrick
            && <Deck
              tooltips={Object.keys(status.currentTrick)}
              cards={Object.values(status.currentTrick)}
            />
          }
          <Deck cards={status.chien} turned={true} />
        </div>
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
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
