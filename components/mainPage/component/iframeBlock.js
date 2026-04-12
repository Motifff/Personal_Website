'use client'

import { useState, useEffect } from 'react'
import { usePassword } from './passwordProtect'
import { decryptLink } from '@/utils/crypto'

export default function IframeBlock(props) {
  const { encryptedLink, link, aspectRatio = '16/9', title = '' } = props
  const password = usePassword()
  const [decryptedUrl, setDecryptedUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  // 判断是否为加密链接
  const isEncrypted = !!encryptedLink

  useEffect(() => {
    if (isEncrypted && password) {
      setIsLoading(true)
      setError(false)

      decryptLink(encryptedLink, password)
        .then(url => {
          if (url) {
            setDecryptedUrl(url)
          } else {
            setError(true)
          }
          setIsLoading(false)
        })
        .catch(() => {
          setError(true)
          setIsLoading(false)
        })
    }
  }, [encryptedLink, password, isEncrypted])

  // 如果是明文链接，直接使用
  if (!isEncrypted && link) {
    return (
      <div style={{ position: 'relative', width: '100%', aspectRatio }}>
        <iframe
          src={link}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    )
  }

  // 加密链接：需要密码
  if (isEncrypted) {
    // 无密码（页面未加密或未解锁）
    if (!password) {
      return (
        <div style={{
          width: '100%',
          aspectRatio,
          backgroundColor: '#08050E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '14px',
        }}>
          🔒 加密内容需要密码解锁
        </div>
      )
    }

    // 加载中
    if (isLoading) {
      return (
        <div style={{
          width: '100%',
          aspectRatio,
          backgroundColor: '#08050E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '14px',
        }}>
          解密中...
        </div>
      )
    }

    // 解密失败
    if (error) {
      return (
        <div style={{
          width: '100%',
          aspectRatio,
          backgroundColor: '#08050E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FF6B6B',
          fontSize: '14px',
        }}>
          解密失败
        </div>
      )
    }

    // 解密成功
    if (decryptedUrl) {
      return (
        <div style={{ position: 'relative', width: '100%', aspectRatio }}>
          <iframe
            src={decryptedUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
      )
    }
  }

  // 默认返回空
  return null
}