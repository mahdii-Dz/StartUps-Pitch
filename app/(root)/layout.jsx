import Navbar from "../components/Navbar"

function layout({children}) {
  return (
    <main>
        <Navbar/>
        {children}
    </main>
  )
}

export default layout