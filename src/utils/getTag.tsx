import { Tag } from 'antd'

export const getTag = (applyPosition: string) => {
  let color = ''
  let text = ''
  let positionType = ''

  const regex = /fresher|junior|intern|senior/i
  const match = applyPosition.match(regex)

  if (match) {
    positionType = match[0].toLowerCase()
  }
  switch (positionType) {
    case 'fresher':
      color = 'green'
      text = 'Fresher'
      break
    case 'junior':
      color = 'blue'
      text = 'Junior'
      break
    case 'intern':
      color = 'purple'
      text = 'Intern'
      break
    case 'senior':
      color = 'red'
      text = 'Senior'
      break
    default:
      color = 'default'
      text = applyPosition
      break
  }

  return <Tag color={color}>{text.toUpperCase()}</Tag>
}

export const renderTagsByScore = (score: number) => {
  if (score >= 50) {
    return (
      <Tag bordered={false} color='success'>
        {score}
      </Tag>
    )
  } else if (score >= 35) {
    return (
      <Tag bordered={false} color='warning'>
        {score}
      </Tag>
    )
  } else {
    return (
      <Tag bordered={false} color='error'>
        {score}
      </Tag>
    )
  }
}
