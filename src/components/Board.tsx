import * as React from 'react'
import { Board as BoardType } from 'src/models'
import classNames from 'classnames'
import Block from './Block'
import styles from './Board.scss'

interface BoardProps {
  board: BoardType
}

const Board: React.FC<BoardProps> = props => {
  const board = props.board
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)

  const openBlock = React.useCallback(
    (evt: React.MouseEvent) => {
      const target = evt.target as HTMLElement
      const x = target.getAttribute('data-x')
      const y = target.getAttribute('data-y')
      if (x && y) {
        board.open(+x, +y)
        forceUpdate()
      }
    },
    [board.gameID]
  )

  const mark = React.useCallback(
    (evt: React.MouseEvent) => {
      if (evt.button === 2) {
        // 右键点击
        evt.preventDefault()
        const target = evt.target as HTMLElement
        const x = target.getAttribute('data-x')
        const y = target.getAttribute('data-y')
        if (x && y) {
          board.markFlag(+x, +y)
          forceUpdate()
        }
      }
    },
    []
  )

  const preventDefault = React.useCallback(
    (evt: React.MouseEvent) => {
      evt.preventDefault()
    },
    []
  )

  const className = classNames(
    'board',
    typeof board.isWin === 'boolean' && 'board--finished',
  )
  
  return (
    <div 
      className={className} 
      onMouseDown={mark}
      onContextMenu={preventDefault}
      onClick={openBlock}>
      {board.items.map((blocks, rowIndex) => {
        return (
          <div 
            key={rowIndex}
            className={styles.line}>
            {blocks.map(block => (
              <Block 
                key={block.id}
                block={block}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Board