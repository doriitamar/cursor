
class Cursor {
  constructor(text, delimiter = '\n') {
    if (text.lenth === 0) throw new Error('Cannot instantiate a cursor for empty text');
    this.text = text.split(delimiter);
    this.delimiter = delimiter;
    this.location = { line: 0, char: 0 };
  }

  static begin() {
    return { line: 0, char: 0 };
  }

  set location({ line, col }) {
    if (line > this.end().line) {
      this.done = true;
    } else if (this.text[line].length <= col) {
      throw new Error(`Set location column on line ${line} is invalid`);
    }

    this.location = { line, col };
  }

  getLines() {
    return this.text;
  }

  end() {
    const lastLine = this.text.length - 1;
    return [lastLine, this.text[lastLine].charAt(this.text[lastLine].length - 1)];
  }

  read(delimiter = this.delimiter) {
    if (delimiter === this.delimiter) {
      return this.readLine();
    } else if (this.done) {
      throw new Error('Location is set outside of text boundries');
    } else {
      let found = '';
      while (!this.done) {
        const currLine = this.readLine();
        const delIndex = currLine.indexOf(delimiter);
        found = found.concat(currLine).concat(this.delimiter);
        if (delIndex !== -1) {
          this.location.col = delIndex;
          return found.substring(0, delIndex);
        }
      }

      return null;
    }
  }

  readLine({ upward }) {
    if (this.done) {
      throw new Error('Location is set outside of text boundries');
    }
    const line = this.getLine();
    this.location = { line: this.location.line + (upward ? -1 : 1), col: 0 };

    return line;
  }

  getLine() {
    return this.text[this.location.line].substring(this.location.col);
  }
}

module.exports = Cursor;
