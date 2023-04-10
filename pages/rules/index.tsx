import classNames from 'classnames'
import rules from './rules.module.scss'

export default function Rules() {
  return (
    <>
      <h1 className={classNames('orange', rules.title)}>Rules</h1>
      <div>
        <div></div>
      </div>
    </>
  )
}
