import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import Block from 'src/components/block/index';
import { getProp } from 'src/utils/index';
import styles from './styles.scss';

const getCurrentEvent = events => {
  const NOW = moment();
  let curr = events[events.length - 1];

  for (let i = events.length - 1; i >= 0; i--) {
    if (events[i].to.isAfter(NOW)) curr = events[i];
    if (events[i].from.isAfter(NOW)) curr = events[i];
  }

  return curr;
};

const getTimerData = (event) => {
  const NOW = moment();

  if (event.to.isBefore(NOW)) return false;

  const date = event.from.isAfter(NOW) ? event.from : event.to;

  const days = date.diff(NOW, 'days');
  const hours = date.diff(NOW, 'hours')
    - days * 24;
  const minutes = date.diff(NOW, 'minutes')
    - hours * 60
    - days * 24 * 60;
  const seconds = date.diff(NOW, 'seconds')
    - hours * 60 * 60
    - minutes * 60
    - days * 24 * 60 * 60;

  return {
    days,
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
  };
};

class Date extends PureComponent {
  constructor(props) {
    super(props);

    props.events.forEach(item => {
      item.from.locale(props.lang);
      item.to.locale(props.lang);
    });

    const event = getCurrentEvent(props.events);
    const timer = getTimerData(event);

    this.state = {
      event,
      timer,
    };

    this.interval = null;
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      const event = getCurrentEvent(this.props.events);
      const timer = getTimerData(event);

      this.setState({ event, timer });

      if (!timer) {
        clearInterval(this.interval);
      }
    }, 200);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      nextProps.events.forEach(item => {
        item.from.locale(nextProps.lang);
        item.to.locale(nextProps.lang);
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { events, translate } = this.props;
    const { event } = this.state;
    const NOW = moment();
    const isActiveEvent = event.from.isBefore(NOW) && event.to.isAfter(NOW);

    const period = events[events.length - 1].to.diff(events[0].from, 'seconds');
    const fill = NOW.diff(events[0].from, 'seconds');
    let fillWidth = 100 * fill / period;
    fillWidth = fillWidth < 0 ? 0 : fillWidth;
    fillWidth = fillWidth > 100 ? 100 : fillWidth;

    const progressDates = [];
    const progressItems = [];
    const progressDescriptions = [];

    for (let i = 0; i < events.length; i++) {
      const item = events[i];

      if (i > 0 && events[i - 1].to.isBefore(item.from)) {
        const empty = item.from.diff(events[i - 1].to, 'seconds');

        progressItems.push((
          <div
            key={`empty-${i}`}
            className={styles.progressEmpty}
            style={{ width: `${100 * empty / period}%` }}
          />
        ));

        progressDates.push((
          <div
            key={`empty-date-${i}`}
            className={styles.progressDate}
            style={{ width: `${100 * empty / period}%` }}
          >
            {events[i - 1].to.format('L')}
          </div>
        ));

        progressDescriptions.push((
          <div
            key={`empty-description-${i}`}
            className={styles.progressDescription}
            style={{ width: `${100 * empty / period}%` }}
          />
        ));
      }

      const duration = item.to.diff(item.from, 'seconds');

      progressItems.push((
        <div
          key={`event-${i}`}
          className={styles.progressItem}
          style={{ width: `${100 * duration / period}%` }}
        >
          {getProp(translate, item.title)}
        </div>
      ));

      progressDates.push((
        <div
          key={`event-date-${i}`}
          className={styles.progressDate}
          style={{ width: `${100 * duration / period}%` }}
        >
          {item.from.format('L')}
        </div>
      ));

      progressDescriptions.push((
        <div
          key={`event-description-${i}`}
          className={styles.progressDescription}
          style={{ width: `${100 * duration / period}%` }}
        >
          {getProp(translate, item.description)}
        </div>
      ));
    }

    return (
      <Block
        className={styles.block}
        titleClassName={styles.title}
      >
        <div className={styles.content}>
          <div className={styles.calendar} data-aos="fade-left">
            <div className={styles.eventTitle}>{getProp(translate, event.title)}</div>
            <div className={styles.eventDescription}>{getProp(translate, event.description)}</div>
            <i className={styles.icon}>today</i>
            <div className={styles.when}>{translate.when}</div>
            <div className={event.from.isAfter(NOW) ? styles.dateActive : styles.date}>
              {event.from.format('LL')}
            </div>
            <div className={isActiveEvent ? styles.datePathActive : styles.datePath} />
            <div className={isActiveEvent ? styles.dateActive : styles.date}>
              {event.to.format('LL')}
            </div>
          </div>
          {this.state.timer
            ? (
              <div className={styles.timer} data-aos="fade-right">
                <div className={styles.part}>
                  <div className={styles.number}><span>{this.state.timer.days}</span></div>
                  <div className={styles.label}>{translate.days}</div>
                </div>
                <div className={styles.part}>
                  <div className={styles.number}><span>{this.state.timer.hours}</span></div>
                  <div className={styles.label}>{translate.hours}</div>
                </div>
                <div className={styles.part}>
                  <div className={styles.number}><span>{this.state.timer.minutes}</span></div>
                  <div className={styles.label}>{translate.minutes}</div>
                </div>
                <div className={styles.part}>
                  <div className={styles.number}><span>{this.state.timer.seconds}</span></div>
                  <div className={styles.label}>{translate.seconds}</div>
                </div>
              </div>
            ) : (
              <div className={styles.started}>{translate.end}</div>
            )}
        </div>
        <div className={styles.progress}>
          <div className={styles.progressDates} data-aos="fade-left">
            {progressDates}
          </div>
          <div className={styles.progressBar} data-aos="fade-right">
            <div
              className={styles.progressFill}
              style={{ width: `${fillWidth}%` }}
            >
              <div className={styles.progressFlash} />
            </div>
            {progressItems}
          </div>
          <div className={styles.progressDescriptions} data-aos="fade-left">
            {progressDescriptions}
          </div>
        </div>
      </Block>
    );
  }
}

Date.propTypes = {
  lang: PropTypes.string.isRequired,
  translate: PropTypes.shape({
    days: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired,
    seconds: PropTypes.string.isRequired,
    when: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    events: PropTypes.object.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  lang: state.lang,
  translate: state.translate.date,
});

export default connect(mapStateToProps)(Date);
