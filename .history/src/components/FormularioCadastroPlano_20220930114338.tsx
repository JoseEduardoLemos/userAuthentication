






export default function FormularioCadastroPlano(onSubimitItem, nameField, id) {

    return (
        <form onSubmit={submiteform}>
            <div className='cardCidade'>
                <div>
                    <div className='f1'>
                        <TextField
                            id="inserirTexto"
                            name="nomeCidade"
                            fullWidth
                            label="Nome da cidade"
                            variant="outlined"
                            placeholder="Nome da Cidade"
                            required
                        />
                    </div>
                    <div className='f1'>
                        <TextField
                            id="inserirTexto"
                            name="urlBrasao"
                            fullWidth
                            label="URL do Brasão"
                            variant="outlined"
                            placeholder="URL do Brasão"
                            required
                        />
                    </div>
                    <div className='f12'>
                        <Button id='botaolimpar' size="large" type='reset' variant="outlined">LImpar</Button>
                        <Button id='botao' size='large' variant="contained" type="submit">Salvar</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}



