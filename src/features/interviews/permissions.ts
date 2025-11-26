// Simplified permissions: always allow interview creation for now to ensure
// the app stays functional. Implement proper limits if needed.
export async function canCreateInterview() {
  return true
}
