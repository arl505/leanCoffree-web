import Modal from './Modal'

function App() {
  return (
    <div class="bg-gray-800 text-center text-gray-100 min-h-screen min-w-screen">
      <div class="pt-3">
        <div class="bg-gray-700 rounded-l-lg ml-5 p-3 text-left sm:pl-10">
          <h1>Lean Coffree, a <b>free</b> Lean Coffee discussion tool</h1>
        </div> 

        <br/>

        {/*todo: replace the below div with a screenshot of app when done*/}
        <div class="bg-red-600 w-85w h-48w max-h-50h m-auto outline"/>

        <br/>

        <Modal/>
        
        <br/>

        <button class="p-3 outline hover:bg-gray-900"><h3>Join Lean Coffree session</h3></button>
      </div>
    </div>
  );
}

export default App;
