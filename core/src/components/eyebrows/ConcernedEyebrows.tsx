import { useTheme } from '../../themeContext'

export const ConcernedEyebrows = () => {
  const { colors } = useTheme()

  return (
    <>
      <path
        d="M255.06,519.62l13-4.4,31.2-10.54,37.6-12.7,32.49-11c5.27-1.78,10.55-3.51,15.8-5.34l.23-.07a10.6,10.6,0,0,0,6-4.6,10,10,0,0,0-3.58-13.68,10,10,0,0,0-7.71-1l-13,4.39-31.2,10.54-37.6,12.71-32.49,11c-5.27,1.78-10.55,3.52-15.8,5.34l-.23.08a10.6,10.6,0,0,0-6,4.6,10,10,0,0,0,3.58,13.68,10,10,0,0,0,7.71,1Z"
        fill={colors.outline}
      />
      <path
        d="M617.56,475l12.73,5.13,30.54,12.31,36.81,14.84,31.81,12.83c5.15,2.07,10.26,4.3,15.47,6.24l.22.08c2.25.91,5.71.16,7.71-1a10,10,0,0,0,3.58-13.69l-1.56-2a10,10,0,0,0-4.41-2.57L737.73,502l-30.54-12.32-36.81-14.84L638.57,462c-5.15-2.08-10.26-4.31-15.47-6.24l-.22-.09c-2.25-.91-5.71-.16-7.71,1a10,10,0,0,0-3.58,13.68l1.56,2a10.07,10.07,0,0,0,4.41,2.58Z"
        fill={colors.outline}
      />
    </>
  )
}
