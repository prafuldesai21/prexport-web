export async function onRequest(context) {
    // 1. Setup CORS so your website is allowed to read this data
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
    };

    try {
        // 2. Access the KV database (context.env contains your bindings)
        const { env } = context;
        
        // 3. Get the current count from KV (defaults to 0 if not found)
        const currentCount = await env.COUNTER_DB.get("total_visits") || "0";
        
        // 4. Increment the number
        const newCount = parseInt(currentCount) + 1;
        
        // 5. Store the updated number back in KV
        await env.COUNTER_DB.put("total_visits", newCount.toString());

        // 6. Return the new number to your website
        return new Response(newCount.toString(), {
            headers: corsHeaders,
        });
    } catch (err) {
        // Fallback in case of an error (e.g., KV binding missing)
        return new Response("Error: " + err.message, {
            status: 500,
            headers: corsHeaders
        });
    }
}