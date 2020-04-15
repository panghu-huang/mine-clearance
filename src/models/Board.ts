import shuffle from 'lodash/shuffle'
import { Block } from './Block'

export class Board {
  public readonly gameID: string
  public rows = 0
  public columns = 0
  public totalCount = 0
  public markedCount = 0
  public mineCount = 0
  public items: Array<Block[]> = []
  public mines: Block[] = []
  public isWin: boolean | null = null
  public resolvedCount = 0

  constructor() {
    this.gameID = Math.random().toString(32).slice(2)
  }

  public init = (rows: number, columns: number, mineCount: number) => {
    if (rows <= 0 || columns <= 0) {
      throw new Error('invalid row or columns')
    }
    this.totalCount = rows * columns
    this.rows = rows
    this.columns = columns
    this.mineCount = mineCount
    if (mineCount >= this.totalCount) {
      throw new Error('invalid mineCount')
    }

    this.initItems()
  }

  public markFlag(x: number, y: number) {
    if (typeof this.isWin === 'boolean') {
      return
    }
    const row = this.items[y]
    if (!row) {
      return
    }
    const block = row[+x]
    if (block.isOpened) {
      return
    }
    block.isMarked = !block.isMarked
    block.regenerateID()
  }

  public open(x: number, y: number) {
    if (typeof this.isWin === 'boolean') {
      return
    }
    const row = this.items[y]
    if (!row) {
      return
    }
    const block = row[+x]
    if (block.isOpened) {
      return
    }
    // 更新 ID，触发 React 更新
    block.regenerateID()
    block.isOpened = true
    if (block.isMine) {
      block.isLoseTrigger = true
      this.mines.forEach(mine => {
        mine.isOpened = true
        mine.regenerateID()
      })
      this.isWin = false
      return
    }
    if (block.isEmpty) {
      this.openConnectedEmpties(block)
    }
    this.resolvedCount++
    if (this.resolvedCount === (this.totalCount - this.mineCount)) {
      this.isWin = true
    }
  }

  private openConnectedEmpties = (block: Block) => {
    const empties = block.empties
    empties.forEach(emptyBlock => {
      if (!emptyBlock.isOpened) {
        emptyBlock.isOpened = true
        emptyBlock.regenerateID()
        this.resolvedCount++
        this.openConnectedEmpties(emptyBlock)
      }
    })
  }

  private initItems = () => {
    const tempItems = Array(this.totalCount)
      .fill(null)
      .map((_, index) => {
        const block = new Block()
        if (index < this.mineCount) {
          block.isMine = true
          this.mines.push(block)
        }
        return block
      })

    const shuffled = shuffle(tempItems)
    const items: Array<Block[]> = []
    while (shuffled.length) {
      items.push(
        shuffled.splice(0, this.columns)
      )
    }
    this.items = items

    this.eachBlocks((block: Block) => {
      block.complete(items)
    })

    this.eachBlocks((block: Block) => {
      block.resolveEmpties(items)
    })

  }

  private eachBlocks = (fn: (block: Block) => void) => {
    let rowIndex = 0
    let columnIndex = 0
    while (rowIndex < this.rows && columnIndex < this.columns) {
      const current = this.items[rowIndex][columnIndex]
      current.x = columnIndex
      current.y = rowIndex
      // run function
      fn(current)
      columnIndex++
      if (columnIndex >= this.columns) {
        columnIndex = 0
        rowIndex++
      }
    }
  }
}