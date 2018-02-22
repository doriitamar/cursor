
class Cursor {
  constructor(text) {
    if (text.lenth === 0) throw new Error('Cannot instantiate a cursor for empty text');
    this.text = text.split('\n');
    this.location = [0, 0];
  }

  static begin() {
    return [0, 0];
  }

  end() {
    const lastLine = this.text.length - 1;
    return [lastLine, this.text[lastLine].charAt(this.text[lastLine].length - 1)];
  }
}
