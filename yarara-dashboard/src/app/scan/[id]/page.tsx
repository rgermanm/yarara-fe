// app/scan/[id].tsx
'use client'; // Mark this as a Client Component

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Scan } from '@/types/interfaces';
import { Card } from '@/components/ui/card';



export default function ScanPage() {
  const { id } = useParams(); // Get the `id` from the URL
  const router = useRouter();
  const [scan, setScan] = useState<Scan | null>({_id:"2",output:"",scanDate:new Date(),status:"",vulnerabilitiesCount:1});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // Fetch scan data by ID
    const fetchScan = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/api/scans/${id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch scan');
        }
        const data = await response.json();
       // setScan(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchScan();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!scan) {
    return <div>Scan not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scan Details</h1>
      <div className="space-y-4">
        <p><strong>Id:</strong> {scan._id}</p>
        <p><strong>Date:</strong> {new Date(scan.scanDate).toLocaleString()}</p>
        <p><strong>Vulnerabilities:</strong> {scan.vulnerabilitiesCount ? scan.vulnerabilitiesCount : 0}</p>
        <p><strong>Status:</strong> {scan.status}</p>
        <p><strong>Output:</strong> {scan.status}</p>
        <Card className="p-4 bg-gray-800 rounded-lg shadow-sm">
          {scan.output}
          {`==== OLLAMA RESPONSE FOR assertBlockHeight (Finding 1) ====
### Summary
A critical vulnerability has been detected in the use of 'block-height within an assert statement. The issue is loc ated at 'examples/assertBlockHeight.clar*.
### Root Cause
The problem arises
due to the inconsistency between Stacks blockchain's block height and the underlying Bitcoin bloc
kchain, which can lead to a malicious user exploiting this discrepancy. The usage of 'block-height' in the assert st atement is causing this issue.
### Suggested Fix
Replace the occurrence of 'block-height' with 'burn-block-height'.
•clarity
(asserts! (> (get expiry nft-asset) burn-block-height) err-expiry-in-past)
Processing detector: callInsideAsContract
Processing finding 1 of 1
Sending to Ollama...
==== OLLAMA RESPONSE FOR callInsideAsContract (Finding 1) ====
### Summary
A vulnerability was found in the examples/callInsideAsContract.clar file where a contract is being called inside a nother contract using the
as-contract function, impersonating the called contract.
### Root Cause
The 'as-contract function allows a contract to assume the identity of another contract when calling it. If this hap pens, the current transaction sender (tx-sender) information is lost, potentially enabling malicious activity.
### Suggested Fix
• "clarity
(define-public (function (paramA uint) (paramB uint))
(try! (as-contract .fixed_contract)
(contract-call? paramA paramB)))
Replace the current function with one that uses a predefined, whitelisted contract instead of an arbitrary contract.`}
        </Card>

      </div>

      <button
        onClick={() => router.push('/dashboard')}
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        Back to Dashboard
      </button>
    </div>
  );
}