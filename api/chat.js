import React from 'react'
import ReactDOM from 'react-dom/client'
import ERSA from './ERSA.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{background:'#0D2B45',color:'#ff6b6b',padding:32,fontFamily:'monospace',minHeight:'100vh',whiteSpace:'pre-wrap'}}>
          <div style={{color:'#90CAF9',marginBottom:16,fontSize:18}}>ERSA — Runtime Error</div>
          <div style={{color:'#fff',marginBottom:8}}>{this.state.error.toString()}</div>
          <div style={{color:'rgba(255,255,255,0.5)',fontSize:12}}>{this.state.error.stack}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ERSA />
    </ErrorBoundary>
  </React.StrictMode>
)
