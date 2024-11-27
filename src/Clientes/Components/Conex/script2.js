import { supabase } from "./script1"

async function fetchData() {
  const { data, error } = await supabase
    .from('producto')
    .select('*')

  if (error) console.log('Error:', error)
  else console.log('Data:', data)
}

fetchData()
