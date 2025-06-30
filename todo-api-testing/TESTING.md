## Testing Strategy

### ✅ TDD Approach
1. Wrote failing tests (Red)
2. Made them pass (Green)
3. Refactored to modular controllers (Refactor)

### ✅ Edge Cases
- No task during creation (400)
- Update non-existent todo (404)

### ✅ Async & Mocked Testing
- Used Jest mocks to simulate DB delays and failures
- Isolated controller behavior from data

### ✅ Load Testing
- Used Artillery to simulate 300 requests
- Server held stable under 50ms avg latency
- No crashes or memory spikes

### ✅ Coverage
- All CRUD operations tested
- Mock and stub coverage ensures isolated logic
