// Utility functions for exporting data

export const generatePDF = (data: any[], filename: string, title: string) => {
  // Create a simple HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .header { text-align: center; margin-bottom: 30px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
      </div>
      <table>
        <thead>
          <tr>
            ${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => 
            `<tr>${Object.values(row).map(value => `<td>${value}</td>`).join('')}</tr>`
          ).join('')}
        </tbody>
      </table>
      <div class="footer">
        <p>This is a system-generated document.</p>
      </div>
    </body>
    </html>
  `

  // Create a new window and print
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    
    // Wait for the content to load, then trigger print
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }
}

export const generateExcel = (data: any[], filename: string) => {
  // Convert data to CSV format
  const headers = Object.keys(data[0] || {})
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escape commas and quotes in values
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value
      }).join(',')
    )
  ].join('\n')

  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up
  URL.revokeObjectURL(url)
}

export const downloadSingleRecord = (record: any, recordType: string, format: 'pdf' | 'csv' = 'pdf') => {
  const data = [record]
  const filename = `${recordType}_${record.id || 'record'}_${new Date().toISOString().split('T')[0]}`
  
  if (format === 'pdf') {
    generatePDF(data, filename, `${recordType} Record`)
  } else {
    generateExcel(data, filename)
  }
}

export const downloadMultipleRecords = (records: any[], recordType: string, format: 'pdf' | 'csv' = 'pdf') => {
  const filename = `${recordType}_all_records_${new Date().toISOString().split('T')[0]}`
  
  if (format === 'pdf') {
    generatePDF(records, filename, `All ${recordType} Records`)
  } else {
    generateExcel(records, filename)
  }
}

// Specific export functions for different data types
export const exportVehicles = (vehicles: any[], format: 'pdf' | 'csv' = 'pdf') => {
  const vehicleData = vehicles.map(v => ({
    ID: v.id,
    Make: v.make,
    Model: v.model,
    Year: v.year,
    Plate: v.plate,
    Type: v.type,
    Status: v.status,
    Location: v.location,
    'Daily Rate': v.price,
    Rating: v.rating,
    'Total Bookings': v.totalBookings,
    Revenue: v.revenue
  }))
  
  downloadMultipleRecords(vehicleData, 'vehicles', format)
}

export const exportBookings = (bookings: any[], format: 'pdf' | 'csv' = 'pdf') => {
  const bookingData = bookings.map(b => ({
    ID: b.id,
    Customer: b.customer,
    Email: b.email,
    Phone: b.phone,
    Vehicle: b.vehicle,
    Plate: b.plate,
    Dates: b.dates,
    Duration: b.duration,
    Status: b.status,
    'Total Amount': b.totalAmount,
    Deposit: b.deposit,
    'Pickup Location': b.pickupLocation,
    'Dropoff Location': b.dropoffLocation,
    'Booking Date': b.bookingDate,
    'Special Requests': b.specialRequests
  }))
  
  downloadMultipleRecords(bookingData, 'bookings', format)
}

export const exportContracts = (contracts: any[], format: 'pdf' | 'csv' = 'pdf') => {
  const contractData = contracts.map(c => ({
    ID: c.id,
    'Contract Number': c.contractNumber,
    Customer: c.customer,
    Email: c.email,
    Phone: c.phone,
    Vehicle: c.vehicle,
    Plate: c.plate,
    Type: c.type,
    Status: c.status,
    Duration: c.duration,
    'Total Amount': c.totalAmount,
    Deposit: c.deposit,
    'Signed Date': c.signedDate,
    'Next Payment': c.nextPayment,
    'Auto Renew': c.autoRenew ? 'Yes' : 'No'
  }))
  
  downloadMultipleRecords(contractData, 'contracts', format)
}

export const exportLegalRecords = (records: any[], format: 'pdf' | 'csv' = 'pdf') => {
  const legalData = records.map(r => ({
    ID: r.id,
    'Record Type': r.recordType,
    Title: r.title,
    Reference: r.reference,
    Status: r.status,
    Provider: r.provider,
    'Policy/License Number': r.policyNumber || r.licenseNumber || 'N/A',
    'Coverage Amount': r.coverageAmount,
    Premium: r.premium,
    'Start Date': r.startDate,
    'End Date': r.endDate,
    'Renewal Date': r.renewalDate,
    'Last Reviewed': r.lastReviewed,
    'Next Review': r.nextReview
  }))
  
  downloadMultipleRecords(legalData, 'legal_records', format)
}

export const exportNotifications = (notifications: any[], format: 'pdf' | 'csv' = 'pdf') => {
  const notificationData = notifications.map(n => ({
    ID: n.id,
    Type: n.type,
    Title: n.title,
    Message: n.message,
    Time: n.time,
    Date: n.date,
    Status: n.read ? 'Read' : 'Unread'
  }))
  
  downloadMultipleRecords(notificationData, 'notifications', format)
}

export const exportRevenueReport = (revenueData: any[], format: 'pdf' | 'csv' = 'pdf') => {
  const filename = `revenue_report_${new Date().toISOString().split('T')[0]}`
  
  if (format === 'pdf') {
    generatePDF(revenueData, filename, 'Revenue Report')
  } else {
    generateExcel(revenueData, filename)
  }
}
