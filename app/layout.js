import localFont from 'next/font/local'
import "./globals.css";
import "easymde/dist/easymde.min.css"

const workSans = localFont({
  src: [
    {
      path:"./fonts/WorkSans-Regular.ttf",
      weight:"400",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-Medium.ttf",
      weight:"500",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-SemiBold.ttf",
      weight:"600",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-Bold.ttf",
      weight:"700",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-ExtraBold.ttf",
      weight:"800",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-Black.ttf",
      weight:"900",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-Light.ttf",
      weight:"300",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-ExtraLight.ttf",
      weight:"200",
      style:"normal"
    },
    {
      path:"./fonts/WorkSans-Thin.ttf",
      weight:"100",
      style:"normal"
    }
  ],
  variable:'--font-work-sans'
})


export const metadata = {
  title: "StartUp Pitch",
  description: "my first next-JS app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      </head>
      <body
        className={workSans.className}
      >
        {children}
      </body>
    </html>
  );
}
