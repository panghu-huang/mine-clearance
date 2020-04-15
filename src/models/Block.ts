let id = 0

export class Block {
  public id: number = 0
  public isOpened = false
  public isMarked = false
  public isMine = false
  public isEmpty = false
  public aroundMineCount = 0
  public x = 0
  public y = 0
  public empties: Block[] = []
  // 是否是引爆的雷了
  public isLoseTrigger = false

  constructor() {
    this.regenerateID()
  }

  public regenerateID = () => {
    this.id = id++
  }

  public complete = (items: Array<Block[]>) => {
    const { x, y } = this
    let aroundMineCount = 0
    for (let rowDiff = -1; rowDiff <= 1; rowDiff++) {
      const rowIndex = y + rowDiff
      if (!items[rowIndex]) {
        continue
      }
      for (let columnDiff = -1; columnDiff <= 1; columnDiff++) {
        const columnIndex = x + columnDiff
        if (!items[rowIndex][columnIndex]) {
          continue
        }
        const block = items[rowIndex][columnIndex]
        if (block.isMine) {
          aroundMineCount++
        }
      }
    }
    this.isEmpty = !aroundMineCount
    this.aroundMineCount = aroundMineCount
  }

  public resolveEmpties = (items: Array<Block[]>) => {
    const { x, y, isEmpty } = this
    if (!isEmpty) {
      return
    }
    for (let rowDiff = -1; rowDiff <= 1; rowDiff++) {
      const rowIndex = y + rowDiff
      if (!items[rowIndex]) {
        continue
      }
      for (let columnDiff = -1; columnDiff <= 1; columnDiff++) {
        const columnIndex = x + columnDiff
        if (!items[rowIndex][columnIndex]) {
          continue
        }
        const block = items[rowIndex][columnIndex]
        // 先把周围空的存进来
        if ((x === columnIndex && Math.abs(y - rowIndex) === 1)
          || (Math.abs(x - columnIndex) === 1 && y === rowIndex)) {
          if (block.isEmpty) {
            this.empties.push(block)
          }
        }
      }
    }
  }

}