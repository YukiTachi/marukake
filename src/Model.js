export default class Model {
  constructor() {
    this._board = {
      1: { 1: null, 2: null, 3: null },
      2: { 1: null, 2: null, 3: null },
      3: { 1: null, 2: null, 3: null }
    };

    this._turn = 1;

    this.suzi = {
      start: 1,
      end: 3
    };

    this.dan = {
      start: 1,
      end: 3
    };

    this._history = [];
  }

  get currentTurn() {
    return this._turn;
  }

  get board() {
    return this._board;
  }

  get history() {
    return this._history;
  }

  isPut(suzi, dan) {
    return !(this._board[suzi][dan] === 0 || this._board[suzi][dan] === 1);
  }

  /**
   * @return {boolean} 勝敗が付いているかを真偽値で返却
   */
  isResult() {
    let turnMove;
    if (this.isFirstMove()) {
      turnMove = 1;
    } else {
      turnMove = 0;
    }

    const checkVictory = val => {
      return val === turnMove;
    };

    for (let dan = this.dan.start; dan <= this.dan.end; dan++) {
      let danArrar = [];
      for (let suzi = this.suzi.start; suzi <= this.suzi.end; suzi++) {
        danArrar.push(this._board[suzi][dan]);
      }
      if (danArrar.every(checkVictory)) {
        return true;
      }
    }

    for (let suzi = this.suzi.start; suzi <= this.suzi.end; suzi++) {
      let suziArrar = [];
      for (let dan = this.dan.start; dan <= this.dan.end; dan++) {
        suziArrar.push(this._board[suzi][dan]);
      }
      if (suziArrar.every(checkVictory)) {
        return true;
      }
    }

    const slashCheckArrar = [];
    for (let suzi = this.suzi.start; suzi <= this.suzi.end; suzi++) {
      const dan = suzi;
      slashCheckArrar.push(this._board[suzi][dan]);
    }
    if (slashCheckArrar.every(checkVictory)) {
      return true;
    }

    const backSlashCheckArrar = [];
    for (let suzi = this.suzi.end; suzi >= this.suzi.start; suzi--) {
      const dan = this.suzi.end - suzi + 1;
      backSlashCheckArrar.push(this._board[suzi][dan]);
    }
    if (backSlashCheckArrar.every(checkVictory)) {
      return true;
    }

    return false;
  }

  putMarukaku(suzi, dan) {
    const marukake = this.isFirstMove() ? 1 : 0;
    this._board[suzi][dan] = marukake;

    this._history.push({
      turn: this.currentTurn,
      suzi: suzi,
      dan: dan,
      move: this.isFirstMove()
    });
  }

  addvanceTurn() {
    this._turn++;
  }

  /**
   * @return {boolean} trueなら先手
   */
  isFirstMove() {
    return this._turn % 2 > 0;
  }

  isSecondMove() {
    return this._turn % 2 === 0;
  }

  reset() {
    for(let i = this.suzi.start; i <= this.suzi.end; i++) {
      for(let j = this.dan.start; j <= this.dan.end; j++) {
        this._board[i][j] = null;
      }
    }

    this._history = [];
  }
}
