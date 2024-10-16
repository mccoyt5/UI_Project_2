<script>
    import { Link } from 'svelte-routing';
  </script>
  
  <div>
    <h1>Water Level Page</h1>
    <button>
      <Link to="/">Back to Main Page</Link>
    </button>
  </div>
  
  <style>
    button {
      padding: 10px;
      margin: 5px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>