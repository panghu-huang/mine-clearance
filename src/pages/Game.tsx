import * as React from 'react'
import { Board } from 'src/components'
import { Board as BoardType } from 'src/models'
import styles from './Game.scss'

const Game: React.FC = () => {
  const [board, setBoard] = React.useState<BoardType | null>(null)
  React.useEffect(
    () => {
      const board = new BoardType()
      board.init(20, 20, 60)
      setBoard(board)
    },
    []
  )
  return (
    <div className={styles.game}>
      {board && <Board board={board}/>}
    </div>
  )
}

export default Game