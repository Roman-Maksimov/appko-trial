import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import Block from 'src/components/block';
import Slider from 'src/components/slider';
import Bottom from './objects/bottom';
import Exchange from './objects/exchange';
import Forex from './objects/forex';
import Layer from './objects/layer';
import LayerFx from './objects/layer-fx';
import Top from './objects/top';
import User from './objects/user';
import styles from './styles.scss';

class How extends PureComponent {
  constructor() {
    super();

    this.state = {
      slide: 0,
      layer: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(slide) {
    this.setState({ slide, layer: this.state.slide > 0 && slide > 1 });

    if (this.state.slide < 1 && slide > 1) {
      setTimeout(() => this.setState({ layer: true }), 1050);
    }
  }

  render() {
    const { translate } = this.props;

    return (
      <Block
        title={translate.title}
        subTitle={translate.subtitle}
        className={styles.block}
        titleProps={{
          'data-aos': 'fade-left',
        }}
        contentProps={{
          'data-aos': 'fade-right',
        }}
      >
        <Slider
          total={5}
          activeIndex={0}
          onChange={this.onChange}
          isShowProgress
        >
          <div className={styles[`slide-${this.state.slide}`]}>
            <div className={styles.layerFx}>
              <LayerFx
                active={this.state.slide > 3}
              />
            </div>

            <div className={styles.forex}>
              <Forex />
            </div>

            <div className={styles.layer}>
              <Layer
                active={this.state.layer}
              />
            </div>

            <div className={styles.user1}>
              <User />
            </div>

            <div className={styles.user2}>
              <User />
            </div>

            <div className={styles.user3}>
              <User />
            </div>

            <div className={styles.user4}>
              <User />
            </div>

            <div className={styles.user5}>
              <User />
            </div>

            <div className={styles.user6}>
              <User />
            </div>

            <div className={styles.user7}>
              <User />
            </div>

            <div className={styles.bottom}>
              <Bottom
                light={this.state.slide > 0}
              />
            </div>

            <div className={styles.exchange4}>
              <Exchange />
            </div>

            <div className={styles.exchange5}>
              <Exchange />
            </div>

            <div className={styles.exchange6}>
              <Exchange />
            </div>

            <div className={styles.exchange1}>
              <Exchange
                title="Exmo"
                hover={this.state.slide === 0}
                bars={this.state.slide === 0}
                users={this.state.slide === 0}
              />
            </div>

            <div className={styles.exchange2}>
              <Exchange
                title="Poloniex"
                hover={this.state.slide === 0}
                bars={this.state.slide === 0}
                users={this.state.slide === 0}
              />
            </div>

            <div className={styles.exchange3}>
              <Exchange
                title="Kraken"
                hover={this.state.slide === 0}
                bars={this.state.slide === 0}
                users={this.state.slide === 0}
              />
            </div>

            <div className={styles.top}>
              <Top
                bars={this.state.slide > 0}
                increase={this.state.slide > 2}
                forex={this.state.slide > 3}
                light={this.state.slide > 0}
              />
            </div>
          </div>
        </Slider>
        <div className={styles.texts}>
          {translate.text.map((text, index) => (
            <div
              key={index}
              className={this.state.slide === index ? styles.textActive : styles.text}
            >{translate.text[index]}</div>
          ))}
        </div>
      </Block>
    );
  }
}

How.propTypes = {
  translate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    exchange: PropTypes.string.isRequired,
    web: PropTypes.string.isRequired,
    terminals: PropTypes.string.isRequired,
    api: PropTypes.string.isRequired,
    text: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  translate: state.translate.how,
});

export default connect(mapStateToProps)(How);
