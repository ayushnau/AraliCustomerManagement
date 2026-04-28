#!/bin/bash

API_URL="${1:-https://aralicustomermanagement.onrender.com}"

echo "Seeding 12 customers to $API_URL..."

curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Aarav Sharma","email":"aarav.sharma@techflow.in","phone":"+91 9876543210"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Priya Patel","email":"priya.patel@designhub.co","phone":"+91 8765432109"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Rohan Gupta","email":"rohan.gupta@cloudnine.io","phone":"+91 7654321098"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Ananya Reddy","email":"ananya.reddy@sparklab.in","phone":"+91 9988776655"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Vikram Joshi","email":"vikram.joshi@nexwave.com","phone":"+91 8877665544"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Sneha Nair","email":"sneha.nair@brightpath.co","phone":"+91 7766554433"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Karan Mehta","email":"karan.mehta@coderaft.in","phone":"+91 9012345678"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Diya Kapoor","email":"diya.kapoor@lunavault.io","phone":"+91 8901234567"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Arjun Verma","email":"arjun.verma@gridpulse.in","phone":"+91 7890123456"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Kavya Iyer","email":"kavya.iyer@peakmind.co","phone":"+91 9123456780"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Harsh Malhotra","email":"harsh.m@ironclad.dev","phone":"+91 8234567891"}' > /dev/null
curl -s -X POST "$API_URL/customers" -H "Content-Type: application/json" -d '{"name":"Simran Bose","email":"simran.bose@leafnode.in","phone":"+91 7345678912"}' > /dev/null

echo "Done! 12 customers added."
