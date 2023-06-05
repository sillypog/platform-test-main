import collection from 'lodash/collection'

class CSV {
  rows = [];
  errors = [];

  constructor(text) {
    // Break the text into lines, removing trailing new lines.
    const lines = text.trim().split("\n");
    console.log("File contains", lines.length, "lines.")

    // Process header as a special line
    const header = lines.shift();
    if(!this.#isHeaderValid(header)) {
      throw new Error("Misformed input format");
    }

    const processedLines = lines.map((line, i) => {
      // Split on delimiter
      const fields = line.split(';')
  
      if (!this.#isRowValid(fields)) {
        return {
          error_type: "Bad Entry",
          input: line,
          line_number: i + 2 // Account for header being removed
        }
      }
      
      return {
        id: this.#cleanString(fields[0]),
        name: this.#cleanString(fields[1]),
        picture: {
          url: this.#cleanString(fields[2])
        }
      }
    })

    const [errors, rows] = collection.partition(processedLines, (line) => {
      return line.error_type != null;
    })

    this.rows = rows
    this.errors = errors
  }

  #isHeaderValid(header) {
    return this.#cleanString(header) === "id;name;url" 
  }

  #isRowValid(fields) {
    return fields.length == 3
  }

  #cleanString(string) {
    return string.replaceAll('"', '').trim();
  }
}

export {CSV}