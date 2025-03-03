// formatWalletAddress.test.js
import { formatWalletAddress } from '@utils/index'; // 假设这是你的文件路径

describe('formatWalletAddress', () => {
  // 测试空地址
  test('should return empty string when address is empty', () => {
    expect(formatWalletAddress('')).toBe('');
    expect(formatWalletAddress(null)).toBe('');
    expect(formatWalletAddress(undefined)).toBe('');
  });

  // 测试短地址（不足以格式化的长度）
  test('should return original address when too short', () => {
    expect(formatWalletAddress('12345')).toBe('12345');
    expect(formatWalletAddress('0x123')).toBe('0x123');
    expect(formatWalletAddress('abcde')).toBe('abcde');
  });

  // 测试默认参数格式化（6+4）
  test('should format address correctly with default parameters', () => {
    expect(formatWalletAddress('12345678901234567890')).toBe('123456...7890');
    expect(formatWalletAddress('0x12345678901234567890')).toBe('0x123456...7890');
  });

  // 测试带0x前缀的地址
  test('should preserve 0x prefix when present', () => {
    const longAddress = '0x1234567890abcdef1234567890abcdef12345678';
    expect(formatWalletAddress(longAddress)).toBe('0x123456...5678');
  });

  // 测试自定义长度参数
  test('should format address with custom start and end lengths', () => {
    expect(formatWalletAddress('12345678901234567890', 4, 3)).toBe('1234...890');
    expect(formatWalletAddress('0x12345678901234567890', 5, 5)).toBe('0x12345...45678');
  });

  // 测试边缘情况：正好等于startLength + endLength
  test('should return original address when length equals startLength + endLength', () => {
    expect(formatWalletAddress('12345678', 4, 4)).toBe('12345678');
    expect(formatWalletAddress('0x12345678', 4, 4)).toBe('0x12345678');
  });

  // 测试非常长的地址
  test('should handle very long addresses correctly', () => {
    const longAddress = '1234567890abcdef1234567890abcdef1234567890abcdef';
    expect(formatWalletAddress(longAddress)).toBe('123456...cdef');
  });

  // 测试非标准输入
  test('should handle addresses without cleaning special characters', () => {
    expect(formatWalletAddress('abc!@#defghijklmno')).toBe('abc!@#...lmno');
    expect(formatWalletAddress('0xabc!@#defghijklmno')).toBe('0xabc!@#...lmno');
  });
});
