import { NextResponse } from 'next/server';
import dns from 'dns';
import util from 'util';

const resolve = util.promisify(dns.resolve);

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('q');

    if (!domain) {
        return NextResponse.json({ error: 'Missing domain query' }, { status: 400 });
    }

    // Basic validation/normalization
    let domainToCheck = domain.trim();
    if (!domainToCheck.includes('.')) {
        domainToCheck += '.com';
    }

    try {
        let isAvailable = false;

        try {
            // Attempt to resolve the domain (checks for A records by default)
            await resolve(domainToCheck);
            // If successful, it has an IP -> Taken
            isAvailable = false;
        } catch (error: any) {
            if (error.code === 'ENOTFOUND') {
                // Domain does not resolve -> Likely Available
                isAvailable = true;
            } else {
                // Other DNS errors (timeout, formatting) -> Assume Taken to be safe, or log
                console.error(`DNS check failed for ${domainToCheck}:`, error);
                // If it's an invalid domain format, it's definitely "not available" for purchase via this simple API
                isAvailable = false;
            }
        }

        // 2. Determine Price
        // Since we don't have a paid registrar API key, we simulate the "Base Price" 
        // based on TLD market averages.
        const tld = domainToCheck.split('.').pop()?.toLowerCase() || 'com';

        // Mock Base Prices (INR)
        const basePrices: Record<string, number> = {
            com: 1199.00,
            net: 1399.00,
            org: 1299.00,
            io: 4999.00,
            co: 2499.00,
            ai: 7999.00,
            app: 1699.00,
            dev: 1499.00,
            xyz: 199.00,
            in: 599.00,
            uk: 999.00,
            ca: 1199.00
        };

        // Default to ₹2000 if unknown TLD
        const basePrice = basePrices[tld] || 1999.00;

        // Add 10% markup as requested
        const markupPercentage = 0.10;
        const finalPrice = basePrice * (1 + markupPercentage);

        return NextResponse.json({
            domain: domainToCheck,
            available: isAvailable,
            price: isAvailable ? Math.round(finalPrice) : null,
            currency: 'INR',
            basePrice: isAvailable ? basePrice : null
        });

    } catch (error) {
        console.error("Domain API Error:", error);
        return NextResponse.json({ error: 'Failed to check domain' }, { status: 500 });
    }
}
