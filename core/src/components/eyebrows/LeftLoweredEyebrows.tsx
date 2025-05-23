import { useTheme } from '../../themeContext'

export const LeftLoweredEyebrows = () => {
  const { colors } = useTheme()

  return (
    <>
      <path
        d="M603.1,452.29a320.74,320.74,0,0,1,33.51-6.66L634,446a150.31,150.31,0,0,1,39.75-.48l-2.66-.36c3.28.45,6.54,1,9.82,1.41l-2.66-.35a222.52,222.52,0,0,1,29.48,6.1c5,1.4,11.11-1.72,12.3-7a10.19,10.19,0,0,0-7-12.3,239.34,239.34,0,0,0-34.58-6.78l2.65.36a142.93,142.93,0,0,0-33.43-1.95,236.67,236.67,0,0,0-33.1,4.54c-5.61,1.14-11.19,2.44-16.76,3.81-5.08,1.25-8.61,7.26-7,12.3a10.21,10.21,0,0,0,12.3,7Z"
        fill={colors.outline}
      />
      <path
        d="M261.26,502.22l14.13-1.48,33.67-3.52L350,492.93l35.18-3.69c5.72-.59,11.44-1.17,17.16-1.79l.24,0c2.73-.28,5.07-.92,7.07-2.93a10,10,0,0,0,0-14.14c-1.83-1.69-4.48-3.2-7.07-2.93l-14.13,1.48-33.67,3.53-41,4.29-35.18,3.68c-5.72.6-11.44,1.18-17.16,1.8l-.24,0c-2.73.29-5.07.93-7.07,2.93a10,10,0,0,0,0,14.15c1.83,1.68,4.48,3.2,7.07,2.92Z"
        fill={colors.outline}
      />
    </>
  )
}
