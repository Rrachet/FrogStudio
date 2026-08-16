param(
    [string]$BaseUrl = "http://localhost:3000"
)

$casesPath = Join-Path -Path $PSScriptRoot -ChildPath "contact-form-testcases.json"

if (!(Test-Path $casesPath)) {
    Write-Host "Error: File not found: $casesPath" -ForegroundColor Red
    exit 1
}

try {
    $cases = Get-Content -Path $casesPath -Raw | ConvertFrom-Json
}
catch {
    Write-Host "Failed to read JSON file." -ForegroundColor Red
    Write-Host $_
    exit 1
}

$results = @()

foreach ($c in $cases) {

    $payload = @{
        name    = $c.name
        company = $c.company
        email   = $c.email
        phone   = $c.phone
        service = $c.service
        budget  = $c.budget
        message = $c.message
    } | ConvertTo-Json

    Write-Host "Submitting: $($c.name) / $($c.email)"

    try {

        $resp = Invoke-RestMethod `
            -Method POST `
            -Uri "$BaseUrl/api/submit-form" `
            -ContentType "application/json" `
            -Body $payload

        $results += [PSCustomObject]@{
            name     = $c.name
            email    = $c.email
            ok       = $true
            response = $resp
        }

    }
    catch {

        $statusCode = "Unknown"

        if ($_.Exception.Response) {
            try {
                $statusCode = [int]$_.Exception.Response.StatusCode
            }
            catch {}
        }

        $results += [PSCustomObject]@{
            name       = $c.name
            email      = $c.email
            ok         = $false
            statusCode = $statusCode
            response   = $_.Exception.Message
        }

        Write-Host "Request Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

$outPath = Join-Path -Path $PSScriptRoot -ChildPath "contact-form-submit-test-results.json"

$results | ConvertTo-Json -Depth 20 | Out-File -FilePath $outPath -Encoding utf8

Write-Host ""
Write-Host "Results written to:"
Write-Host $outPath -ForegroundColor Green