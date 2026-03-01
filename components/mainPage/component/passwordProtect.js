'use client'

import { useState, useEffect } from 'react'
import { sha256 } from 'js-sha256'
import Name from './name'
import PagePort from './pageport'
import LanguageSwitcher from './languageSwitcher'

export default function PasswordProtect({ children, passwordHash, showHeader = false }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [input, setInput] = useState('')
  const [hasError, setHasError] = useState(false)

  // 防止页面滚动
  useEffect(() => {
    if (!isAuthenticated) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isAuthenticated])

  const handleSubmit = () => {
    if (!input) {
      setHasError(true)
      return
    }

    const inputHash = sha256(input)

    if (inputHash === passwordHash) {
      setIsAuthenticated(true)
      setHasError(false)
    } else {
      setHasError(true)
    }
  }

  if (isAuthenticated) return children

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#18191B',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    }}>
      {/* Header - 只在 showHeader 为 true 时显示 */}
      {showHeader && (
        <div style={{
          display: 'flex',
          width: '100vw',
          padding: '24px',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          gap: '24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <Name isSubpage={true} />
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              columnGap: 16,
              rowGap: 8,
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1
            }}>
              <PagePort isSubpage={true} />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}

      {/* Password Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '200px 192px',
        backgroundColor: '#18191B'
      }}>
        <div style={{
          width: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '26px'
        }}>
          {/* Title and Subtitle */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
          }}>
            <div style={{
              position: 'relative',
              width: '100%'
            }}>
              {/* Top line decoration */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                height: '1px',
                width: '100%',
                marginBottom: '1px'
              }} />

              {/* Main title */}
              <div style={{
                fontSize: '48px',
                fontWeight: '500',
                color: '#fff',
                letterSpacing: '-0.48px',
                lineHeight: '1.3',
                whiteSpace: 'pre-wrap'
              }}>
                密码
              </div>
            </div>

            {/* Subtitle */}
            <div style={{
              fontSize: '10px',
              fontWeight: '500',
              color: '#d4d5d9',
              letterSpacing: '-0.1px',
              lineHeight: '1.3',
              width: '256px',
              whiteSpace: 'pre-wrap',
              marginTop: '4px'
            }}>
              需要输入密码以访问
            </div>
          </div>

          {/* Input */}
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setHasError(false)
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            autoFocus
            style={{
              width: '100%',
              height: '60px',
              backgroundColor: hasError ? '#FF6B6B' : '#d4d5d9',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#18191b',
              boxSizing: 'border-box',
              padding: '0 16px',
              transition: 'background-color 0.2s'
            }}
          />
        </div>
      </div>
    </div>
  )
}
