import * as React from 'react'
import { Block as BlockType } from 'src/models'
import classNames from 'classnames'
import styles from './Block.scss'

interface BlockProps {
  block: BlockType
}

const Block: React.FC<BlockProps> = props => {
  const block = props.block

  const className = classNames(
    styles.block,
    block.isOpened && styles.isOpened,
    block.aroundMineCount && `block--count-${block.aroundMineCount}`,
    block.isMarked && !block.isOpened && styles.isMarked,
  )
  const content = React.useMemo(
    () => {
      if (block.isLoseTrigger) {
        return (
          <span className='icon icon-mine icon-mine-trigger'/>
        )
      }
      if (!block.isOpened && block.isMarked) {
        return <span className='icon icon-flag'/>
      }
      if (block.isOpened && block.isMine) {
        return <span className='icon icon-mine'/>
      }
      if (block.isOpened && block.aroundMineCount) {
        return block.aroundMineCount
      }
      return null
    },
    [block.isMarked, block.isOpened]
  )
  return (
    <span
      data-x={block.x}
      data-y={block.y}
      className={className}>
      {content}
    </span>
  )
}

export default React.memo(Block, (prevProps, nextProps) => {
  return prevProps.block.isOpened === nextProps.block.isOpened
    && prevProps.block.isMarked === nextProps.block.isMarked
})