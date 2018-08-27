import React, { Component } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

export default class Tabs extends Component {
  static propTypes = {
    screens: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        component: PropTypes.node.isRequired, // FIXME: vad är korrekt här?
      }).isRequired,
    ).isRequired,
  }

  state = {
    currentIndex: 0,
  }

  currentTabRef = React.createRef()
  borderRef = React.createRef()

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { screens } = this.props
    const { currentIndex } = this.state
    const CurrentScreen = screens[this.state.currentIndex].component

    return (
      <div className="relative">
        <div className="flex flex-row bg-white shadow relative z-10">
          {screens.map(({ title }, index) => (
            <button
              key={title}
              ref={currentIndex === index && this.currentTabRef}
              onClick={() => this.setState({ currentIndex: index })}
              className={classNames(
                "font-nunito text-15 font-semibold px-m py-s border-b-2 border-transparent",
                {
                  "text-primary border-cyan": currentIndex === index,
                  "text-beige-darker": currentIndex !== index,
                },
              )}
            >
              {title}
            </button>
          ))}
          <div ref={this.borderRef} className="border-b-2 border-cyan" />
        </div>
        <div className="relative z-0">
          <CurrentScreen />
        </div>
      </div>
    )
  }
}
