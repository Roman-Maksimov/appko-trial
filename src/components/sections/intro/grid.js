import React, { PureComponent } from 'react';
import styles from './grid.scss';

const COLS_NUM = 10;
const ROWS_NUM = 10;

const COLS = [];
const ROWS = [];
const BOXES = [];

const LABELS = {
  33: 'C-CEX',
  35: 'BlueTrade',
  37: 'COINBASE',
  42: 'OKCoin',
  44: 'LocalBitcoins',
  46: 'CEX.IO',
  53: 'YouBit',
  55: 'KRAKEN',
  57: 'HitBTC',
  62: 'LiveCoin',
  64: 'EXMO',
  66: 'POLONIEX',
};

for (let i = 0; i < COLS_NUM; i++) {
  COLS.push(<div key={`col-${i}`} className={styles.col} />);
}

for (let i = 0; i < ROWS_NUM; i++) {
  ROWS.push(<div key={`row-${i}`} className={styles.row} />);
}

for (let i = 0; i < ROWS_NUM * COLS_NUM; i++) {
  BOXES.push(
    <div key={`box-${i}`} className={styles.box}>
      {LABELS[i] && (
        <div className={styles.label}>{LABELS[i]}</div>
      )}
    </div>
  );
}

class Grid extends PureComponent {
  constructor() {
    super();

    this.state = {
      showColumns: false,
      showRows: false,
      showBoxes: false,
      isBlack: false,
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ showColumns: true });

      setTimeout(() => {
        this.setState({ showRows: true });

        setTimeout(() => {
          this.setState({ showBoxes: true });
        }, 1000);
      }, 1000);
    }, 300);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={this.state.showColumns ? styles.columnsActive : styles.columns}>
            {COLS}
          </div>
          <div className={this.state.showRows ? styles.rowsActive : styles.rows}>
            {ROWS}
          </div>
          <div className={this.state.showBoxes ? styles.boxesActive : styles.boxes}>
            {BOXES}
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
