import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    const ok = login(email, password);
    setLoading(false);
    if (ok) navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm animate-scale-in">
        <CardHeader className="text-center">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-2">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle>Connect.Gestão</CardTitle>
          <CardDescription>Entre com suas credenciais</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />
            </div>
            <div>
              <Label htmlFor="pass" className="text-xs">Senha</Label>
              <Input id="pass" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-[11px] text-muted-foreground text-center space-y-1">
            <p className="font-medium">Área do Administrador</p>
          </div> 
        </CardContent>
      </Card>
    </div>
  );
}
