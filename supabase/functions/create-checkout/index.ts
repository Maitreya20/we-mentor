
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import Stripe from 'https://esm.sh/stripe@12.5.0?target=deno';

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Set up Stripe with the test key
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

// Define plan prices (these would be actual Stripe price IDs in production)
const PRICE_IDS = {
  basic: 'price_test_basic', // These are placeholder IDs
  pro: 'price_test_pro',
};

// For test purposes, we'll simulate Stripe products
const TEST_PRICES = {
  basic: {
    id: 'price_test_basic',
    name: 'Basic Plan',
    amount: 4900, // $49.00
    currency: 'usd',
  },
  pro: {
    id: 'price_test_pro',
    name: 'Pro Plan',
    amount: 9900, // $99.00
    currency: 'usd',
  },
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get request body
    const { planType, userId, successUrl, cancelUrl } = await req.json();
    
    if (!planType || !userId || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Skip actual Stripe API calls for the test version
    // In a real implementation, you would create a Checkout Session here
    
    // Create a supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Simulate a successful checkout by directly updating the user's subscription
    const { error } = await supabase
      .from('subscriptions')
      .upsert({ 
        user_id: userId, 
        plan_type: planType,
        active: true,
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'user_id'
      });

    if (error) {
      console.error('Error updating subscription:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to update subscription' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // For testing, return a mock checkout URL
    // In production, this would be the actual Stripe checkout URL
    return new Response(
      JSON.stringify({
        // In a test scenario, we'll directly redirect to the success URL
        checkoutUrl: successUrl,
        // Include test data for reference
        testMode: true,
        planDetails: planType === 'basic' ? TEST_PRICES.basic : TEST_PRICES.pro,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
